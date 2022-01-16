import React from 'react'

import './AppBar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl, Nav } from 'react-bootstrap'

function AppBar() {
  return (
    <Nav className="navbar-app">

      <BootstrapContainer className="trello-container">
        <Row>
          <Col sm ={5} xs ={12} className="col-no-padding">
            <div className="app-actions">
              <div className="item all"><i className="fa fa-th"/></div>
              <div className="item home"><i className="fa fa-home"/></div>
              <div className="item boards"><i className="fa fa-columns"/>&nbsp;&nbsp;<strong>Boards</strong></div>
              <div className="item search">
                <InputGroup className="group-seach">
                  <FormControl className="input-search" placeholder="Jump to..." />
                  <InputGroup.Text className="input-icon-search"><i className="fa fa-search" /> </InputGroup.Text>
                </InputGroup>
              </div>
            </div>
          </Col>
          <Col sm={5} xs ={16} className="col-no-padding">
            <div className="user-actions">

              <div className="item quick"><i className="fa fa-plus-square-o" /></div>
              <div className="item infor"><i className="fa fa-info-circle" /></div>
              <div className="item notice"><i className="fa fa-bell-o" /></div>
              <div className="item user-avt ">
                <img src="https://scontent.fdad1-3.fna.fbcdn.net/v/t39.30808-6/248344850_2001069623375574_6573599983921137250_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fQSQ0bwzBSkAX8A_M_G&_nc_ht=scontent.fdad1-3.fna&oh=00_AT_qJ-biIzkiiVoSpU4V1edBNSJ8vHHsvzGzXSQ484FZGg&oe=61E08146"
                  alt="HoangCamDev-avt" title="avt"></img>
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </Nav>
  )}
export default AppBar