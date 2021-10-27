import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'


import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'ultilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'ultilities/contentEditable'


import './Column.scss'

import Card from 'components/Card/Card'

import { mapOrder } from 'ultilities/sorts'

import ConfirmModal from 'components/Common/confirmModal'


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [ showConfirmModal, setShowConfirmModal] = useState(false)

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const onConfirmModalAction =(type ) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _detroy:true
      }
      onUpdateColumn(newColumn)

    }
    toggleShowConfirmModal()
  }

  const [columnTitle, setColumnTitle] = useState('')

  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  useEffect(() => {

    setColumnTitle(column.title)
  }, [column.title] )


  const handleColumnTitleBlur =() => {
    console.log(columnTitle)
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
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
          // onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle size="sm" id="dropdown-basic" className="dropdown-btn" />


            <Dropdown.Menu>
              <Dropdown.Item >Add card ...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
              <Dropdown.Item >Move all cards in thiscolumn (beta)</Dropdown.Item>
              <Dropdown.Item >Archive all cards in thiscolumn (beta)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </header>
      <div className = "card-list">

        <Container

          groupName="col"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
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
      </div>
      <footer>
        <div className="footer-actions">
          <i className=" fa fa-plus icon"> </i> Add another card
        </div>

      </footer>

      <ConfirmModal
        show ={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove columns"
        content={`Are you sure uou want to remove<strong> ${column.title}! </strong> <br> All related cards wwill also be removed!`}
      />
    </div>

  )
}

export default Column
