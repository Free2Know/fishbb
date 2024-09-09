import axios from 'axios';

const API_URL = 'https://yuanqi.tencent.com/openapi/v1/agent/chat/completions';
const headers = {
    'X-Source': 'openapi',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer uHut6fq9nNa0a2cFjviRyj1ED10ZXVsf',
};

export const chat = async (assistantId, userId, query) => {
    try {
        const response = await axios.post(API_URL, {
            assistant_id: assistantId,
            user_id: userId,
            stream: false,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: query,
                        },
                    ],
                },
            ],
        }, { headers });

        const responseData = response.data; // 不需要再次解析，因为 axios 返回的数据已经是 JavaScript 对象
        if (responseData.choices && responseData.choices.length > 0 &&
            responseData.choices[0].message && responseData.choices[0].message.content &&
            responseData.choices[0].message.content.length > 0) {
            const firstContent = responseData.choices[0].message.content; // 直接访问 content 属性
            return firstContent;
        } else {
            // 处理无有效响应的情况
            console.warn('响应数据结构不符合预期。');
            return '没有收到有效的响应。';
        }

    } catch (error) {
        // 根据不同的错误类型进行处理
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // 请求已发出，服务器也响应了状态码，但状态代码超出了 2xx 范围
                console.error(`服务器响应状态码为：${error.response.status}，信息为：${error.response.statusText}`);
                return `服务器响应状态码为：${error.response.status}，信息为：${error.response.statusText}`;
            } else if (error.request) {
                // 请求已创建但没有收到响应
                console.error('未能从服务器获取响应，请求信息：', error.request);
                return '未能从服务器获取响应，请稍后再试。';
            } else {
                // 设置请求时出错（例如，发生了一个网络错误）
                console.error('设置请求时发生错误：', error.message);
                return '设置请求时发生错误，请检查网络连接。';
            }
        } else {
            // 发生了其他错误
            console.error('发生未知错误：', error);
            return '发生了未知错误，请稍后再试或联系客服。';
        }
    }
};