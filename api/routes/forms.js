module.exports = [
    {
        "title": "Form 1",
        "id": "123",
        "fields": [
            {
                "name": "First_Name",
                "title": "First Name",
                "fieldType": "Text",
                "required": true
            },
            {
                "name": "Last_Name",
                "title": "Last Name",
                "fieldType": "Text",
                "required": true
            },
            {
                "name": "Age",
                "title": "Age",
                "fieldType": "Number",
                "required": false,
                "options": [
                    { "label": "0-15" },
                    { "label": "16-30" },
                    { "label": "31-60" },
                    { "label": "61-100" }
                ]
            },
            {
                "name": "Birth_Date",
                "title": "Birth Date",
                "fieldType": "Date",
                "required": false
            }
        ]
    },
    {
        "title": "Form 2",
        "id": "456",
        "fields": [
            {
                "name": "Name",
                "title": "Name",
                "fieldType": "Text",
                "required": true
            },
            {
                "name": "Gender",
                "title": "Gender",
                "fieldType": "Text",
                "required": true,
                "options": [
                    { "label": "Male" },
                    { "label": "Female" }
                ]
            }
        ]
    },
    {
        "title": "Form 3",
        "id": "789",
        "fields": [
            {
                "name": "Name",
                "title": "Name",
                "fieldType": "Text",
                "required": true
            },
            {
                "name": "Age",
                "title": "Age",
                "fieldType": "Number",
                "required": false,
                "options": [
                    { "label": "0-15" },
                    { "label": "16-30" },
                    { "label": "31-60" },
                    { "label": "61-100" }
                ]
            },
            {
                "name": "Home",
                "title": "Home",
                "fieldType": "Location",
                "required": true
            }
        ]
    },
    {
        "title": "Form 4",
        "id": "135",
        "fields": [
            {
                "name": "Name",
                "title": "Name",
                "fieldType": "Text",
                "required": true
            },
            {
                "name": "Work Place",
                "title": "Work Place",
                "fieldType": "Location",
                "required": true
            }
        ]
    }
]