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

        return response.data;
    } catch (error) {
        console.error('Failed to fetch chat completion:', error);
    }
};