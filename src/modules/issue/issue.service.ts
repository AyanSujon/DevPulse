// import { pool } from "../../db"
// import type { IIssue } from "./issue.interface";



// const createIssueIntoDB = async(payload : IIssue ) =>{
//         console.log("Creating issue with payload:", payload);
        
//         const {title, description, type, reporter_id} = payload;

//     const result = await pool.query(
//       `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
//       [title, description, type, reporter_id]
//     )
//     return result;
// }

// export const issueService ={
//     createIssueIntoDB,

// }










import { pool } from "../../db"
import type { IIssue } from "./issue.interface";



const createIssueIntoDB = async(payload : IIssue ) =>{
        console.log("Creating issue with payload:", payload);
        
        const {title, description, type, reporter_id} = payload;

    const result = await pool.query(
      `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, type, reporter_id]
    )
    return result;
}


export const getAllIssuesFromDB = async (query: any) => {
  const { sort = "newest", type, status } = query;

  // 1. Build dynamic WHERE conditions
  const conditions: string[] = [];
  const values: any[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  // 2. Sorting
  const orderBy =
    sort === "oldest"
      ? "ORDER BY created_at ASC"
      : "ORDER BY created_at DESC";

  // 3. Fetch issues
  const issuesResult = await pool.query(
    `SELECT * FROM issues ${whereClause} ${orderBy}`,
    values
  );

  const issues = issuesResult.rows;

  if (issues.length === 0) return [];

  // 4. Extract reporter IDs
  const reporterIds = [...new Set(issues.map((i) => i.reporter_id))];

  // 5. Batch fetch reporters (NO JOIN as requested)
  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds]
  );

  const reporterMap = new Map(
    reporterResult.rows.map((r) => [r.id, r])
  );

  // 6. Attach reporter to each issue
  const enrichedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterMap.get(issue.reporter_id) || null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return enrichedIssues;
};












export const issueService ={
    createIssueIntoDB,
    getAllIssuesFromDB,

}