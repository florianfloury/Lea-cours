import React from 'react'

export type DispatchAction = { type: string }

export type ObjectWithType<T> = { [key: string]: T }

export type ChildrenType = { children: React.ReactNode }
