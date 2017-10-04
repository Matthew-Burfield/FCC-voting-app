import { Link } from 'react-router-dom'
import React from 'react';
import { Row, Col } from 'antd/lib/grid'
import Card from 'antd/lib/card'
import 'antd/lib/card/style/css'
import 'antd/lib/grid/style/css'

import PieChart from './PieChart'

const SurveyList = ({ surveys }) => (
  <Row>
    {surveys.map(survey => (
      <Col
        key={ survey._id }
        span={ 8 }
        style={{ padding: 8 }}
      >
        <Link
          to={ `/poll/${survey._id}` }
        >
          <Card
            title={ survey.title }
            bordered={false}
            style={{
              backgroundColor: '#404040',
              color: '#fff',
            }}
          >
            <PieChart
              data={ survey.pollOptions }
              width={200}
              height={200}
            />
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
);

export default SurveyList;