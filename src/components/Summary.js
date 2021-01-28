import React from 'react'
import { Card } from 'antd';

const Summary = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Card title="Total Number of Cutouts" style={{ width: '100%' }}>
                        <div className="text-center">
                            <h3>7</h3>
                        </div>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card title="Total VIN numbers" style={{ width: '100%' }}>
                        <div className="text-center">
                            <h3>7</h3>
                        </div>
                    </Card>
                </div>
              
            </div>
        </div>

    )
}

export default Summary
