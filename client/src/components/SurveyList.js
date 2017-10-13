import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react';
import {
  Card,
  Col,
  Row,
} from 'antd'
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

SurveyList.propTypes = {
  surveys: PropTypes.array,
}

export default SurveyList;