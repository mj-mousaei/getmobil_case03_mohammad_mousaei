import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: 'ToDo',
        tasks: [
            {
                id: '1',
                title: 'Learn JavaScript'
                ,description: 'Learn JavaScript'
            },
            {
                id: '2',
                title: 'Learn Git'
                ,description: 'Learn JavaScript'

            },
            {
                id: '3',
                title: 'Learn Python'
                ,description: 'Learn JavaScript'

            },
        ]
    },
    {
        id: 'InProgress',
        tasks: [
            {
                id: '4',
                title: 'Learn CSS'
                ,description: 'Learn JavaScript'

            },
            {
                id: '5',
                title: 'Learn Golang'
                ,description: 'Learn JavaScript'

            }
        ]
    },
    {
        id: 'Completed',
        tasks: [
            {
                id: '6',
                title: 'Learn HTML'
                ,description: 'Learn JavaScript'

            }
        ]
    },
    {
        id: 'ETC',
        tasks: [
            
        ]
    }
]

export default mockData