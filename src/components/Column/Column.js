import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button, Col } from 'react-bootstrap'
import { cloneDeep } from 'lodash'


import { MODAL_ACTION_CONFIRM } from 'ultilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'ultilities/contentEditable'
import { createNewCard, updateColumn } from 'actions/callAPI'



import './Column.scss'

import Card from 'components/Card/Card'

import { mapOrder } from 'ultilities/sorts'

import ConfirmModal from 'components/Common/confirmModal'


function Column(props) {
  const { column, onCardDrop, onUpdateColumnState } = props
  const cards = mapOrder(column.cards, column.cardOrder, '_id')

  const [ showConfirmModal, setShowConfirmModal] = useState(false)

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)
  // Remove column
  const onConfirmModalAction =(type ) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy:true
      }
       // Call api
       updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        onUpdateColumnState(updatedColumn)
      })
   

    }
    toggleShowConfirmModal()
  }

  const [columnTitle, setColumnTitle] = useState('')

  const [ newCardTitle, setNewCardTitle ] = useState('')


  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)
  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  const [openNewCardForm, setOpenNewCardForm ] = useState(false)

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const newCardTextAreaRef = useRef(null)

  useEffect(() => {

    setColumnTitle(column.title)
  }, [column.title] )

  useEffect(() => {
    if ( newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openNewCardForm])


 // Update column title
  const handleColumnTitleBlur =() => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    console.log(column.title)
    console.log(newColumn.title)
    if(column.title !== newColumn.title) {
      // Call api
      updateColumn(newColumn._id, newColumn).then(updatedColumn => {
        updateColumn.cards = newColumn.cards
        onUpdateColumnState(updatedColumn)
      })
    }

  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus()
      return
    }
    const newCardToAdd = {
      boardId: column.boardId,
      title: newCardTitle.trim(),
      columnId: column._id
    }
    createNewCard(newCardToAdd).then(card => {
      let newColumn = cloneDeep(column)
      newColumn.cards.push(card)
      newColumn.cardOrder.push(card._id)
  
      onUpdateColumnState(newColumn)
      setNewCardTitle('')
      toggleOpenNewCardForm()
    })
    


  }


  return (

    <div className="column">

      <header className = 'column-drag-handle'>

        <div className="column-title">

          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            spellCheck="false"
            value ={ columnTitle}
            onChange ={handleColumnTitleChange}
            onBlur ={handleColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onClick={selectAllInlineText}
            onMouseDown={e => e.preventDefault()}
            // onKeyDown={event => (event.key === 'Enter') && addNewCard()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle size="sm" id="dropdown-basic" className="dropdown-btn" />


            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenNewCardForm} >Add card ...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item >Move all cards in this column (beta)</Dropdown.Item>
              <Dropdown.Item >Archive all cards in thiscolumn (beta)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </header>
      <div className = "card-list">

        <Container

          groupName="col"
          onDrop={dropResult => onCardDrop(column._id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"

          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card}/>
            </Draggable>
          ))}
        </Container>
        {openNewCardForm &&
         <div className="add-new-card-area">
           <Form.Control
             size="sm"
             as ="textarea"
             rows="3"
             placeholder="enter title for this card..."
             className="textarea-enter-new-card"
             ref={newCardTextAreaRef}
             value ={ newCardTitle}
             onChange ={onNewCardTitleChange}
             onKeyDown={event => (event.key === 'Enter') && addNewCard() }
           />
         </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
           <><Button as={Col} variant="success" size="sm" onClick={addNewCard}>Add card</Button>
             <span className="cancel-icon" onClick={toggleOpenNewCardForm}>
               <i className=" fa fa-trash icon" ></i>
             </span></>

        }
        {!openNewCardForm &&
        <div className="footer-actions" onClick ={toggleOpenNewCardForm}>
          <i className=" fa fa-plus icon"> </i> Add another card
        </div>
        }

      </footer>

      <ConfirmModal
        show ={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove columns"
        content={`Are you sure uou want to remove<strong> ${column.title}! </strong> <br> All related cards will also be removed!`}
      />
    </div>

  )
}

export default Column