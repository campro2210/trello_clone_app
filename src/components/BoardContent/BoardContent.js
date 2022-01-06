import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { isEmpty } from 'lodash'

import './BoardContent.scss'

import Column from 'components/Column/Column'

import { mapOrder } from 'ultilities/sorts'

import { applyDrag } from 'ultilities/dragDrop'


import { fetchBoardDetails, createNewColumn } from 'actions/callAPI/index'

function BoardContent() {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumnForm, setOpenNewColumnForm ] = useState(false)

  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const newColumnInputRef = useRef(null)

  const [ newColumnTitle, setNewColumnTitle ] = useState('')

  const onNewColumnTitleChange = (e) => setNewColumnTitle(e.target.value)

  useEffect(() => {

    const boardId = '619287af27f7001bd2c5a574'
    fetchBoardDetails(boardId).then(board => {
      console.log(board)
      setBoard(board)
      //sort column
      setColumns( mapOrder(board.columns, board.columnOrder, '_id' ))
    })


  }, [])
  useEffect(() => {
    if ( newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumnForm])

  if (isEmpty(board)) {
    return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' } }>Board not found!</div>
  }
  const onColumnDrop = (dropResult) => {

    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns


    setColumns(newColumns)
    setBoard(newBoard)
  }

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]

      let currentColumn = newColumns.find(c => c._id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)


      currentColumn.cardOrder = currentColumn.cards.map(c => c._id)


      setColumns(newColumns)
    }
  }


  const addNewColumn = () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
      return
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim()
    }

    createNewColumn(newColumnToAdd).then(column => {
      let newColumns = [...columns]
      newColumns.push(column)
  
      let newBoard = { ...board }
      newBoard.columnOrder = newColumns.map(c => c._id)
      newBoard.columns = newColumns
  
  
      setColumns(newColumns)
      setBoard(newBoard)
      setNewColumnTitle('')
      toggleOpenNewColumnForm()
    })

  }

  const onUpdateColumnState =(newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate._id
    let newColumns =[...columns]

    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)


    if (newColumnToUpdate._destroy) {
      newColumns.splice(columnIndexToUpdate, 1)
    } else {

      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)

    }


    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c._id)
    newBoard.columns = newColumns


    setColumns(newColumns)
    setBoard(newBoard)
  }


  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop} dragHandleSelector=".column-drag-handle"
        getChildPayload={ index => columns[index] }
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        {columns.map((column, index) => (
          <Draggable key = {index}>

            <Column column ={column} onCardDrop={onCardDrop} onUpdateColumnState={onUpdateColumnState} />

         

          </Draggable>
        ))}
      </Container>

      <BootstrapContainer className="trello-container">
        {!openNewColumnForm &&
        <Row>
          <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
            <i className=" fa fa-plus icon"> </i> Add another card
          </Col>
        </Row>
        }
        {openNewColumnForm &&
        <Row>
          <Col className="enter-new-column">
            <Form.Control
              size="sm"
              type="text"
              placeholder="enter new input..."
              className="input-enter-new-column"
              ref={newColumnInputRef}
              value ={ newColumnTitle}
              onChange ={onNewColumnTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
            />
            <Button as={Col} variant="success" size="sm" onClick={addNewColumn}>Add new column</Button>
            <span className="cancel-icon" onClick={toggleOpenNewColumnForm}>
              <i className=" fa fa-trash icon"></i>
            </span>
          </Col>
        </Row>
        }
      </BootstrapContainer>

    </div>
  )
}
export default BoardContent