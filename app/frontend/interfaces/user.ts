export interface AuthUser {
	auth: {
		user: {
			id: string
			email: string
			username: string
			full_name: string
			avatar_url?: string
		}
	}
}