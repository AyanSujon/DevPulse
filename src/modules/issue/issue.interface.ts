// all issues type definition goes here
export interface IIssue {
  id: number;
  title: string;
  description: string; 
  type: "bug" | "feature_request";
  status: "open" | "in_progress" | "resolved"; 
  reporter_id: number;
  created_at: string;
  updated_at: string; 
}

// update issue payload type definition
export interface IUpdateIssuePayload {
  id: number;
  title?: string;
  description?: string;
  type?:"bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
  updated_at: string; 
  created_at: string;
}