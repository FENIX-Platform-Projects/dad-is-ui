import React from 'react';

import {Tabs, TabLink, TabContent} from 'react-tabs-redux';

const App = (props) => (
    <div>
        <Tabs
            name="tabs1"
            className="tabs tabs-1 row"
            handleSelect={props.changeSelectedTab}
            selectedTab={props.tabs1}
        >
            <div className="tab-links col-xs-3">
                <TabLink to="tab1">Tab 1</TabLink>
                <TabLink to="tab2">Tab 2</TabLink>
                <TabLink to="tab3">Tab 3</TabLink>
            </div>

            <div className="content col-xs-9">
                <TabContent for="tab1">
                    <h2>Tab 1 content</h2>
                </TabContent>
                <TabContent for="tab2">
                    <h2>Tab 2 content</h2>
                </TabContent>
                <TabContent for="tab3">
                    <h2>Tab 3 content</h2>
                </TabContent>
            </div>
        </Tabs>
    </div>
);

export default App;