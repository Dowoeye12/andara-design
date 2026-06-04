import { ContactFormData } from './schemas';

export const sendContactEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // If response is not JSON, use status text
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
      throw new Error(errorData.error || 'Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send email. Please try again.');
  }
};

