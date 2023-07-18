export const UserBookStatuses = ["InPlans", "ReadingNow", "Favourite", "Read"] as const

export type UserBookStatus = typeof UserBookStatuses[number]