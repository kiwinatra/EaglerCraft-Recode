 // Загрузка серверов из servers.txt
        async function loadServers() {
            try {
                const response = await fetch('servers.txt');
                if (!response.ok) throw new Error('Failed to load servers');
                
                const text = await response.text();
                const servers = parseServers(text);
                displayServers(servers);
                
                // Скрываем загрузку и показываем контент
                document.getElementById('loading').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            } catch (error) {
                console.error('Error loading servers:', error);
                document.getElementById('loading').innerHTML = `
                    <h1>Error loading servers</h1>
                    <p>${error.message}</p>
                    <button onclick="location.reload()">Try Again</button>
                `;
            }
        }
        
        function parseServers(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const servers = [];
    
    for (const line of lines) {
        try {
            // More flexible parsing that handles your format
            const parts = line.split(/":\s*"/);
            if (parts.length < 2) continue;
            
            const name = parts[0].replace(/^"/, '');
            const remaining = parts[1].split(/",\s*"/);
            if (remaining.length < 2) continue;
            
            const ip = remaining[0];
            const badgesAndVerified = remaining[1].split(/"\s*"/);
            
            servers.push({
                name: name.trim(),
                ip: ip.trim(),
                badges: badgesAndVerified[0].split(',').map(b => b.trim()),
                verified: badgesAndVerified.length > 1 ? 
                         badgesAndVerified[1].toLowerCase().trim() === 'yes' : false,
                official: badgesAndVerified.length > 1 ? 
                badgesAndVerified[1].toLowerCase().trim() === 'off' : false
            });
        } catch (e) {
            console.warn('Failed to parse line:', line, 'Error:', e);
        }
    }
    
    return servers;
}
        
        // Отображение серверов
        function displayServers(servers) {
            const container = document.getElementById('serverList');
            
            if (servers.length === 0) {
                container.innerHTML = '<p>No servers found</p>';
                return;
            }
            
            container.innerHTML = servers.map(server => `
                <div class="server-card">
                    <div class="server-name">${server.name}</div>
                    <div class="server-ip">${server.ip}</div>
                    <div class="server-badges">
                        ${server.verified ? '<span class="badge verified">Верифицированный</span>' : ''}
                        ${server.official ? '<span class="badge verified">Официальный сервер</span>' : ''}
                        ${server.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }
        
        // Загружаем серверы при загрузке страницы
        window.addEventListener('DOMContentLoaded', loadServers);