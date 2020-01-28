import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import MarkdownLinkRenderer from "~components/MarkdownLinkRenderer";
import { ReactComponent as HelpIcon } from "~assets/icons/info-circular-button.svg";
import { ReactComponent as ExclamationIcon } from "~assets/icons/exclamation.svg";
import { ReactComponent as CloseIcon } from "~assets/icons/close.svg";
import { ReactComponent as CheckIcon } from "~assets/icons/checked.svg";

/*

const Help = props => {

  return (
    <div
      className={`help ${modal ? "help-modal" : ""}`}
      data-testid={`${
        modal ? "wrapped-input-help-modal" : "wrapped-input-help"
      }`}
    >
      <div
        ref={spanRef}
        onMouseEnter={onMouseHover}
        className={`help-icon-container ${(styles && styles.helpIcon) || ""}`}
      >
        {renderIcon(type)}
        <span
          style={currentTooltipPosition}
          className={spanClassNames.join(" ")}
        >
          {textToRender(text)}
        </span>
      </div>
    </div>
  );
};*/
const iconTypes = {
  help: HelpIcon,
  error: ExclamationIcon,
  success: CheckIcon,
  close: CloseIcon
};

const renderIcon = (type = "help") => {
  //const IconComponent = iconTypes[type];
  //return <IconComponent className="help-icon" />;
  return <HelpIcon />;
};

const Help = props => {
  const spanRef = useRef();
  const [currentTooltipPosition, setCurrentTooltipPosition] = useState({});

  const handleScroll = () => {
    const { type, right } = props;
    if (spanRef && spanRef.current && type === "error" && right) {
      setCurrentTooltipPosition({
        display: "none"
      });
    }
  };

  const onMouseHover = () => {
    const { type, right } = props;
    if (spanRef && spanRef.current && type === "error" && right) {
      const currentPosition = spanRef.current.getBoundingClientRect();
      setCurrentTooltipPosition({
        top: currentPosition.top + 2,
        left: currentPosition.left + 30,
        position: "fixed"
      });
    }
  };

  useEffect(() => {
    addEventListener("scroll", handleScroll, false);
    return () => {
      removeEventListener("scroll", handleScroll, false);
    };
  });

  const textToRender = text => {
    return Array.isArray(text) ? (
      text
    ) : (
      <ReactMarkdown source={text} renderers={{ link: MarkdownLinkRenderer }} />
    );
  };

  const { text, modal, type, bottom, right, left, styles } = props;
  const spanClassNames = [
    "help-text",
    type === "error" && "help-error-text",
    right && "right",
    bottom && "bottom",
    left && "left",
    styles && styles.helpText
  ].filter(Boolean);

  return (
    <div
      className={`help ${modal ? "help-modal" : ""}`}
      data-testid={`${
        modal ? "wrapped-input-help-modal" : "wrapped-input-help"
      }`}
    >
      <div
        ref={spanRef}
        onMouseEnter={onMouseHover}
        className={`help-icon-container ${(styles && styles.helpIcon) || ""}`}
      >
        {renderIcon(type)}
        <span
          style={currentTooltipPosition}
          className={spanClassNames.join(" ")}
        >
          {textToRender(text)}
        </span>
      </div>
    </div>
  );
};

export default Help;
