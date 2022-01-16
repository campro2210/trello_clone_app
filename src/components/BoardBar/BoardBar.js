import React from 'react'

import './BoardBar.scss'
import { Container as BootstrapContainer, Row, Col } from 'react-bootstrap'
function BoardBar() {
  return (
    <nav className="navbar-board">
      <BootstrapContainer className="trello-container">
        <Row>
          <Col sm = {10} xs = {12} className="col-no-padding">
            <div className="board-infor">
              <div className="item board-name"> &nbsp;&nbsp;  <strong>Trello clone app</strong> </div>
              <div className="divider"></div>
              <div className="item board-type">private Workspace</div>
              <div className="divider"></div>
              <div className="item member-avt">
                <img src="https://scontent.fdad1-3.fna.fbcdn.net/v/t31.18172-8/12828417_848507065296075_7485892403501409910_o.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=kR4eZsSH4TkAX8WWvMn&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8jHfMkQdFu_w8HZZAT-7EdFdoA4vrWhgceP3EvBEJ4qQ&oe=620325B8"
                  alt="img 1" tittle =""/>
                <img src="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/116154806_1626606297488577_8925557679127098870_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=7EjpiFI9pZgAX-va2N5&_nc_ht=scontent.fdad1-3.fna&oh=00_AT8aJxvY1SRAn6458d-Wilv8tAsz6Q-VcXSCNMm2sHLUuQ&oe=6201110D"
                  alt="" tittle =""/>
                <img src="https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/93173480_1536819076467300_5998739234154872832_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=0Z1rwZX1Ts0AX8_vYo5&_nc_ht=scontent.fdad1-2.fna&oh=00_AT8Szwtmge5QIGwfrLchFn9UWFBfxKqhjGm4AamNIBDWdg&oe=6200C438"
                  alt="" tittle =""/>
                <img src="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/78171632_1411358562346686_1073740861927325696_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=19026a&_nc_ohc=Ec38RCF-MOsAX_Ase3g&_nc_ht=scontent.fdad2-1.fna&oh=00_AT9uewVqOReQGbIXd3NpZwAE8-5wRZnsBQvBdJ22zssvlA&oe=6200D70C"
                  alt="" tittle =""/>
                <span className="more-member">+7</span>
                <span className="invite">Invite</span>
              </div>
            </div>
          </Col>
        </Row>
      </BootstrapContainer>
    </nav>
  )
}
export default BoardBar