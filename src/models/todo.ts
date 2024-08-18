import { AuditLog } from "./AuditLog";
import { Priority } from "./priority";
import { Status } from "./status";

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    check: boolean;
    auditLogs: AuditLog[];
}
