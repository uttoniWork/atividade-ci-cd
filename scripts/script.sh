echo "inside script before email"

EMAIL = $EMAIL

echo "inside script after email"
echo "Mandando e-mail com o mail do linux" | mail -s "subject: qualquer coisa" "$EMAIL"