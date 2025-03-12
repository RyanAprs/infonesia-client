import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed");

class VideoBlot extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("contenteditable", "false");
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);
    node.setAttribute("src", this.sanitize(value));
    return node;
  }

  static sanitize(url) {
    return url;
  }

  static formats(domNode) {
    const formats = {};
    const attrs = ["height", "width", "style"];
    attrs.forEach((attr) => {
      if (domNode.hasAttribute(attr)) {
        formats[attr] = domNode.getAttribute(attr);
      }
    });
    return formats;
  }

  format(name, value) {
    const allowedStyles = {
      display: ["inline", "block"],
      float: ["left", "right", "none"],
      margin: [],
      "max-width": [],
      "max-height": [],
    };

    if (["height", "width", "style"].includes(name)) {
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

  static value(domNode) {
    return domNode.getAttribute("src");
  }
}

export default VideoBlot;
