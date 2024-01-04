import React, { useRef } from "react";
import { Card } from "reactstrap";
import PropTypes from "prop-types";
import { CommonText } from "./TextCommon";
import CountUp from "react-countup";

export default function CardDetail(props) {
  const { item, number, styleContentCard, formattor, levelTitle } = props;

  return (
    <Card
      body
      className="cardChildrenDashboard"
      style={{ minHeight: 100, maxHeight: 130 }}
    >
      <div className="cardTitle">
        <CommonText level={8} mt={0} color="#72777b">
          {item.title}
        </CommonText>
        <div className="cardIcon">
          <i className={item.nameIcon} />
        </div>
      </div>
      <div className="contentOfCard">
        <CommonText
          level={!levelTitle ? 6 : levelTitle}
          mt={0}
          color="#2d2d2d"
          style={styleContentCard}
        >
          <CountUp
            end={number}
            duration={
              number > 1e9
                ? 0.2
                : number > 1e6
                ? 0.5
                : number > 1e3
                ? 0.8
                : number < 1e3
                ? 1
                : 0
            }
            formattingFn={value =>
              formattor ? (value !== 0 ? formattor(value) : 0) : value
            }
          />
        </CommonText>
        <CommonText level={7} mt={0} color="#2d2d2d">
          {item.content}
        </CommonText>
      </div>
    </Card>
  );
}

CardDetail.propTypes = {
  levelTitle: PropTypes.number,
  item: PropTypes.object,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styleContentCard: PropTypes.object,
  formattor: PropTypes.func,
};
