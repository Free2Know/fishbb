// api.js
import fetch from 'node-fetch';

const API_URL = 'https://yuanqi.tencent.com/openapi/v1/agent/chat/completions';
const headers = {
    'X-Source': 'openapi',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer uHut6fq9nNa0a2cFjviRyj1ED10ZXVsf',
};

export const getChatCompletion = async (assistantId, userId, query) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
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
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch chat completion:', error);
    }
};