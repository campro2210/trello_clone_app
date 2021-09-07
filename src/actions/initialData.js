export const initialData ={
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardId:'board-1',
                    title: 'To do column',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6'],
                    cards:[
                        {
                            id: 'card-1',
                            boardId:'board-1',
                            columnId: 'column-1',
                            title:'title of card 1',
                            cover: 'https://webaffiliatevn.com/storage/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg'
                        },
                        {  id: 'card-2', boardId:'board-1', columnId: 'column-1', title:'title of card 2', cover: null},
                        {  id: 'card-3', boardId:'board-1', columnId: 'column-1', title:'title of card 3', cover: null},
                        {  id: 'card-4', boardId:'board-1', columnId: 'column-1', title:'title of card 4', cover: null},
                        {  id: 'card-5', boardId:'board-1', columnId: 'column-1', title:'title of card 5', cover: null},
                        {  id: 'card-6', boardId:'board-1', columnId: 'column-1', title:'title of card 6', cover: null},
                    ]
                },
                {
                    id: 'column-2',
                    boardId:'board-1',
                    title: 'Progress column',
                    cardOrder: ['column-7', 'column-8', 'column-9'],
                    cards:[
                        {  id: 'card-7', boardId:'board-1', columnId: 'column-2', title:'title of card 7', cover: null},
                        {  id: 'card-8', boardId:'board-1', columnId: 'column-2', title:'title of card 8', cover: null},
                        {  id: 'card-9', boardId:'board-1', columnId: 'column-2', title:'title of card 9', cover: null}
                    ]
                },
                {
                    id: 'column-3',
                    boardId:'board-1',
                    title: 'done column',
                    cardOrder: ['column-10', 'column-11', 'column-12'],
                    cards:[
                        {  id: 'card-10', boardId:'board-1', columnId: 'column-3', title:'title of card 10', cover: null},
                        {  id: 'card-11', boardId:'board-1', columnId: 'column-3', title:'title of card 11', cover: null},
                        {  id: 'card-12', boardId:'board-1', columnId: 'column-3', title:'title of card 12', cover: null}
                    ]
                }
            ]
        }
    ]

}