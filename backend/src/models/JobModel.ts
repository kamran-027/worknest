import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  description: string;
  category: string;
  location: string;
  applicants: mongoose.Types.ObjectId[];
  postedBy: mongoose.Types.ObjectId;
  savedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

jobSchema.index({ applicants: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ category: 1 });

const Job = mongoose.model<IJob>("Job", jobSchema);
export default Job;
