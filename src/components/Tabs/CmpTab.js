import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const CmpTab = (props) => {
    const [activeTab, setActiveTab] = useState(1);

    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            console.log('Tab:', tab)
            props.callback(tab)
        }
    }

    let { list_tabs=[]} = props

    let navTabs = list_tabs.map( (item, index) => {
        return (
            <NavItem key={index}>
                <NavLink 
                    className={classnames({ active: activeTab === item.id })}
                    onClick={() => { toggle(item.id); }}
                >{item.name}</NavLink>
            </NavItem>
        )
    })

    return (
        <div className='cmp-tab'>
            <div className='cmp-navbar'>
                <Nav tabs>
                    {
                        navTabs
                    }
                </Nav>
            </div>
            <TabContent className='py-5 mt-3' activeTab={activeTab}>
            {
                list_tabs.map((item, index) => {
                    return (
                        <TabPane key={index} tabId={item.id}>
                            <Row>
                                <Col sm="12">
                                    {item.content}
                                </Col>
                            </Row>
                        </TabPane>
                    )
                })
            }
            </TabContent>
        </div>
    );
}

export default CmpTab;