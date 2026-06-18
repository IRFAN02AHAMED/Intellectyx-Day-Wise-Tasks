import Typography from "../../components/common/Typography";

function Contact() {
  return (
    <div className="contact-page">
      <Typography variant="h2">
        Contact Us
      </Typography>

      <Typography variant="p">
        Thank you for visiting the Message Board App.
        If you have any questions, suggestions, or
        feedback, feel free to reach out.
      </Typography>

      <div className="contact-card">
        <Typography variant="h3">
          Get in Touch
        </Typography>

        <Typography variant="p">
          📧 Email: support@messageboard.com
        </Typography>

        <Typography variant="p">
          📞 Phone: +91 98765 43210
        </Typography>

        <Typography variant="p">
          📍 Location: Chennai, India
        </Typography>
      </div>
    </div>
  );
}

export default Contact;