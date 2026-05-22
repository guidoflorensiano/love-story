import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the script tag with lightbox HTML
pattern = r'<script>.*?</script>'
replacement = '''    <!-- Lightbox Modal -->
    <div class="lightbox" id="lightbox">
        <span class="lightbox-close" id="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img" alt="Full size image">
    </div>'''

content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Script replaced with lightbox HTML successfully")
