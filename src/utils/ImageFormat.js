// ImageFormat.js
import Quill from "quill";

const ImageFormatAttributesList = ["height", "width", "style"];
const allowedStyles = {
  display: ["inline"],
  float: ["left", "right"],
  margin: [],
};

const BaseImageFormat = Quill.import("formats/image");

class ImageFormat extends BaseImageFormat {
  static formats(domNode) {
    const formats = {};
    ImageFormatAttributesList.forEach((attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
    });
    return formats;
  }

  format(name, value) {
    if (ImageFormatAttributesList.includes(name)) {
      if (name === "style" && value) {
        const styleEntries = value
          .split(";")
          .map((entry) => entry.trim())
          .filter(Boolean);
        const newStyles = {};

        styleEntries.forEach((entry) => {
          const [key, val] = entry.split(":").map((item) => item.trim());
          if (
            allowedStyles[key] &&
            (allowedStyles[key].length === 0 ||
              allowedStyles[key].includes(val))
          ) {
            newStyles[key] = val;
          }
        });
        const styleString = Object.entries(newStyles)
          .map(([key, val]) => `${key}: ${val}`)
          .join("; ");
        this.domNode.setAttribute("style", styleString);
      } else if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

export default ImageFormat;
