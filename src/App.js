import './App.css';
import React from 'react';
import { Card } from 'antd';


const gridStyle: React.CSSProperties = {
  width: '33.3%',
  textAlign: 'center',
};

function App() {
  return (
    <div className="App">
      <Card title="Features">
        <Card.Grid style={gridStyle}>
          <a
            href={`items/list`}
          >
            View Items
          </a>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <a
            href={`items/create`}
          >
            Create Item
          </a>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <a
            href={`products/create`}
          >
            Create Product
          </a>
        </Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
      </Card>
    </div>
  );
}

export default App;
