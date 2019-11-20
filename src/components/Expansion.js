import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { PALETTE, CSS_TRANSITION_SPEED } from "constants/styles";

const ExpansionHeaderEl = styled.div`
  cursor: pointer;
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: transform ${CSS_TRANSITION_SPEED.default} ease-out;
`;

const ExpansionEl = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: ${(props) =>
    props.hasBorder ? `solid 1px ${PALETTE.white60}` : "none"};
  ${ExpansionHeaderEl} {
    border-bottom: ${(props) =>
      props.hasBorder ? `solid 1px ${PALETTE.white60}` : "none"};
  }
`;

const ExpansionIconEl = styled.div`
  display: block;
  width: auto;
  align-items: center;
  justify-content: space-between;

  img {
    height: 15px;
    width: 15px;
  }
`;

const ExpandedSectionEl = styled.div`
  display: block;
  overflow: hidden;
  padding: 0 1rem;
  height: ${(props) => (props.isExpanded ? "auto" : 0)};
`;

const ExpandedSection = ({ children, isExpanded, ...props }) => {
  const sectionRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    setHeight(sectionRef.current.scrollHeight);
  }, [height]);

  return (
    <ExpandedSectionEl ref={sectionRef} isExpanded={isExpanded} {...props}>
      {children}
    </ExpandedSectionEl>
  );
};

ExpandedSection.propTypes = {
  /**
   * If true, expands the section, otherwise collapse it. Setting this prop enables control over the panel.
   */
  isExpanded: PropTypes.bool,
  /**
   * The content of the expansion component.
   */
  children: PropTypes.node.isRequired,
};

export const Expansion = React.forwardRef(function Expansion(
  { title, hasBorder = false, expandIcon, children, ...props },
  ref,
) {
  const [isExpanded, setExpanded] = React.useState(false);

  const onHandleClick = () => {
    setExpanded(!isExpanded);
  };

  return (
    <ExpansionEl
      hasBorder={hasBorder}
      aria-expanded={isExpanded}
      ref={ref}
      {...props}
    >
      <ExpansionHeaderEl onClick={onHandleClick}>
        {title}
        <ExpansionIconEl>{expandIcon}</ExpansionIconEl>
      </ExpansionHeaderEl>
      <ExpandedSection isExpanded={isExpanded}>{children}</ExpandedSection>
    </ExpansionEl>
  );
});

Expansion.propTypes = {
  /**
   * Title of the Expansion that will be visible
   */
  title: PropTypes.node.isRequired,
  /**
   * If true, default border styling applies
   */
  hasBorder: PropTypes.bool,
  /**
   * Icon to indicate to open or close the expansion
   */
  expandIcon: PropTypes.node.isRequired,
  /**
   * The content of the expansion component.
   */
  children: PropTypes.node.isRequired,
};
