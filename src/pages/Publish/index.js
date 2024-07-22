import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useState, useEffect } from 'react'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
    const { channelList } = useChannel();

    const onFinish = (formValue) => {
        //校验封面类型imageType是否和实际的图片列表imageList数量是相等的
        if (imageList.length !== imageType) return message.warning('请上传正确数量的封面图片')

        const { title, content, channel_id } = formValue;
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // 几张图
                // 这里url的数据结构只是新增文章的时候的数据结构，编辑文章的时候的数据结构是不一样的 
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    }
                    else {
                        return item.url
                    }
                }), //图片列表，看输出的数据结构map映射成正确的url的数组
            },
            channel_id,
        }
        // 有id就是编辑，没有就是新增
        if (articleId) {
            updateArticleAPI({ ...reqData, id: articleId })
        }
        else {
            createArticleAPI(reqData)
        }
        message.success(`${articleId ? '编辑' : '发布'}文章成功`)
    }


    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
        setImageList(value.fileList)
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
        setImageType(e.target.value)
    }

    //useSearchParams钩子用于读取和修改当前位置 URL 中的查询字符串。 searchParams对象的get方法来获取URL查询参数中id键对应的值。
    // 例如，如果URL是https://example.com/article?id=123，那么searchParams.get('id')将会返回字符串"123"
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    const [form] = Form.useForm()
    useEffect(() => {
        // 1. 通过id获取数据
        async function getArticleDetail() {
            const res = await getArticleById(articleId)
            // 优化一下，减少查询次数
            const data = res.data

            const { cover } = data
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            // 为什么现在的写法无法回填封面?
            // 数据结构的问题 set方法->{type:3}  cover:{ type:3}}

            // 回填图片列表
            setImageType(cover.type)
            // 显示图片 ({url : url})
            setImageList(cover.images.map(url => ({ url })))
        }
        // 只有有id的时候才调用函数回填
        if (articleId) {
            // 2. 调用实例方法 完成回填
            getArticleDetail()
        }

    }, [articleId, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleId ? '编辑' : '发布'}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 0 }} // type: 0 无图 1 单图 3 三图
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {/* 值属性用户选中之后会自动收集起来作为接口的提交字段 */}
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* listType:决定选择文件框的外观样式
                            showUploadList:控制显示上传列表 */}
                        {imageType > 0 && <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name='image'
                            onChange={onChange}
                            maxCount={imageType}
                            fileList={imageList}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                        }
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >

                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish