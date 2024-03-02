import React from "react";

export interface IAppRoute {
  path: string;
  element: React.ReactNode;
}

export interface IChildren {
  children: React.ReactNode;
}


export interface ISubtask {
    subtitle: string
    done: boolean
}

export interface ISignUpPayload {
    email: string
    password: string
}

export interface ILoginPayload {
    email: string
    password: string
}

export interface IDialog {
    isOpen: boolean
    onClose: () => void
}

export interface ICreateBoardBody {
    name: string
    columns: string[]
}
export interface ICreateTask {
    title: string
    description: string
    status: string
    subtasks: {
        subtitle: string
        done: boolean
    }[]
}