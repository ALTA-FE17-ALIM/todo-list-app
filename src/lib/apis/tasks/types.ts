/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Task {
  creator_id: string,
  created_at: string,
  assignee_id: string,
  assigner_id: string,
  comment_count: number,
  is_completed: boolean,
  content: string,
  description: string,
  due: {
    date: string,
    is_recurring: boolean,
    datetime: string,
    string: string,
    timezone: string
  },
  duration: any,
  id: string,
  labels: string[],
  order: number,
  priority: number,
  project_id: string,
  section_id: string,
  parent_id: string,
  url: string
}