export interface AddItemModel {

    id?: number;
    title?: string;
    description ?: string;


    taskName?: string;
    taskDescription?: string;
    taskDeadline?: Date,
    taskPriority?: priority,
    isTaskComplete?: boolean,
    taskCreatedBy?: string;

    


}

export enum priority {
    High, Medium, Low
}

