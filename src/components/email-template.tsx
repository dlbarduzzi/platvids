type EmailTemplateProps = {
  email: string
}

export function EmailTemplate({ email }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {email}!</h1>
    </div>
  )
}
