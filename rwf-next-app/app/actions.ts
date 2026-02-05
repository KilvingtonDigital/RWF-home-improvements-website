
'use server'

import { redirect } from 'next/navigation';

export async function submitContactForm(formData: FormData) {
    const rawFormData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        projectType: formData.get('projectType'),
        message: formData.get('message'),
    };

    console.log('Form Submitted:', rawFormData);

    // Here you would send email via Resend/SendGrid/Nodemailer

    // Redirect to home or show success (simple redirect for now to satisfy void return requirement of form action without client state)
    redirect('/?submitted=true');
}
