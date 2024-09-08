const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    language: { type: String, required: true, trim: true, lowercase: true },
    code: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

snippetSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Snippet", snippetSchema);
