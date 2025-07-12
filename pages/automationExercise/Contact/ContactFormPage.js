exports.ContactUsPage = class ContactUsPage {
  constructor(page) {
    this.page = page;
    // Labels
    this.pageTitleLabel = page.locator('h2.title.text-center', { hasText: 'Contact Us' });
    this.getInTouchLabel = page.locator('h2.title.text-center', { hasText: 'Get In Touch' });
    this.feedbackForUsLabel = page.locator('h2.title.text-center', { hasText: 'Feedback For Us' });
    this.noteLabel = page.locator('div.contact-form > div', { hasText: 'Note: Below contact form is for testing purpose.' });
    // Inputs
    this.nameTextBox = page.locator('input[data-qa="name"]');
    this.emailTextBox = page.locator('input[data-qa="email"]');
    this.subjectTextBox = page.locator('input[data-qa="subject"]');
    this.messageTextArea = page.locator('textarea[data-qa="message"]');
    this.fileUploadInput = page.locator('input[type="file"][name="upload_file"]');
    this.submitButton = page.locator('input[data-qa="submit-button"]');
  }
  

  async submitContactForm(name, email, subject, message, filePath = null) {
    await this.nameTextBox.fill(name);
    await this.emailTextBox.fill(email);
    await this.subjectTextBox.fill(subject);
    await this.messageTextArea.fill(message);
    if (filePath) {
      await this.fileUploadInput.setInputFiles(filePath);
    }
    await this.submitButton.click();
  }
};
