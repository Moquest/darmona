import re, glob

SNIPPET = '    <link rel="stylesheet" href="css/bugfix.css">\n    <script src="js/bugfix.js" defer></script>'

for fn in glob.glob('*.html'):
    c = open(fn, encoding='utf-8').read()
    if 'bugfix.css' not in c:
        c = c.replace('</head>', SNIPPET + '\n</head>', 1)
    c = c.replace('&copy; 2025', '&copy; 2026')
    c = c.replace('href="tarieven.html"', 'href="events.html"')
    if 'contact' in fn:
        c = c.replace('minmax(500px, 1fr)', 'minmax(300px, 1fr)')
    open(fn, 'w', encoding='utf-8').write(c)
    print('Gepatcht:', fn)
