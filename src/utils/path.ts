



export const allPaths = {
    home: '/',
    auth: {
        login: `/auth/login`,
        register: `/auth/register`,
        forgotPassword: `/auth/forgot-password`,
        resetPassword: `/auth/reset-password`,
    },
    dashboard: {
        root: `/dashboard`,
        members: `/dashboard/members`,
        member: `/dashboard/members/[id]`,
        profile: `/dashboard/members/[id]/profile`,
        savings: `/dashboard/members/[id]/savings`,
        loans: `/dashboard/members/[id]/loans`,
        investment: `/dashboard/members/[id]/investment`,
        shares: `/dashboard/members/[id]/shares`,
        activityLog: `/dashboard/members/[id]/activity-log`,
    }
}


