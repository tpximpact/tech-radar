export const mockResults = [

    {
        callout: {
            text: [
                {
                    text: {
                        content: "line 1",
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2",
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
        },
        
    },

    {
        heading_3: {
            text: [
                {
                    text: {
                        content: "Rings and Quadrants",
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2 h3",
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
        },
    },
    

    {
        heading_3: {
            text: [
                {
                    text: {
                        content: "What are the rings?"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
            ]
        },
    },

    {
        bulleted_list_item: {
            text: [
                {
                    text: {
                        content: "line 1 bulletedlistitem"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2 bulletedlistitem"
                    },
                    annotations: {
                        "bold": true,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
        }
    },

    {
        bulleted_list_item: {
            text: [
                {
                    text: {
                        content: "line 1 bulletedlistitem2"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2 bulletedlistitem2"
                    },
                    annotations: {
                        "bold": false,
                        "italic": true,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
        }
    },

    {
        heading_3: {
            text: [
                {
                    text: {
                        content: "What are the quadrants?"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
            ]
        },
    },

    {
        bulleted_list_item: {
            text: [
                {
                    text: {
                        content: "line 1 bulletedlistitem q"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2 bulletedlistitem q"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": true,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
    },
    },
    
    {
        bulleted_list_item: {
            text: [
                {
                    text: {
                        content: "line 1 bulletedlistitem2 q"
                    },
                    annotations: {
                        "bold": true,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                },
                {
                    text: {
                        content: "line 2 bulletedlistitem2 q"
                    },
                    annotations: {
                        "bold": false,
                        "italic": false,
                        "strikethrough": false,
                        "underline": false,
                        "code": false,
                        "color": "default"
                    }
                }
            ]
        },
        
    }

];

export const expectedOutput = [
    {
        textArray: [
            {
                text: "What are the rings?",
                annotations: {
                    bold: false,
                    code: false,
                    color: "default",
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    }
            },
        ]
    },
    {
        textArray: [
            {
                text: "line 1 bulletedlistitem",
                annotations: {
                    bold: false,
                    code: false,
                    color: "default",
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    }
            },
            {
                text: "line 2 bulletedlistitem",
                annotations: {
                    bold: true,
                    code: false,
                    color: "default",
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    }
            }
        ]
    },
];