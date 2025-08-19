// this is file what generates by running Eaglercraft
// anyone who upload it to repo with site is dumbass :)

"use strict";
(function(){
	const opts = {};
	var progressPanel = null;
	var progressStr1 = null;
	var progressStr2 = null;
	var progressStr3 = null;
	var progressBarOuter = null;
	var progressBarInner = null;
	var cancelButton = null;
	var currentXHR = null;

	const LOADING_ICON_SRC = "https://avatars.githubusercontent.com/kiwinatra";


	function makePatternA(domain) {
		const domainStr = domain;
		return (cid, path) => { return "https://" + domainStr + "/ipfs/" + cid + "/" + path; };
	}

	function makePatternB(domain) {
		const domainStr = domain;
		return (cid, path) => { return "https://" + cid + ".ipfs." + domain + "/" + path; };
	}
		// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
						// MARK: PATTERN VARIATIONS
		// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	const IPFS_GATEWAYS = [
		makePatternA("gateway.ipfs.io"),
		makePatternB("4everland.io"),
		makePatternB("dweb.link"),
		makePatternA("cloudflare-ipfs.com"),
		makePatternB("cf-ipfs.com"),
		makePatternA("w3s.link"),
		makePatternA("storry.tv"),
		makePatternB("nftstorage.link")
	];

	function tryDecompressDownload(arrayBufferIn) {
		return new Promise((resolve) => {
			var ds = new DecompressionStream("gzip");
			var result = [];
			function fetchStream(reader) {
				return reader.read().then(function processData({ done, value }) {
					if (done) {
						var ret = new Blob(result);
						result = [];
						return ret.arrayBuffer();
					}
					result.push(value);
					return reader.read().then(processData);
				})
			}
			fetchStream((new Blob([arrayBufferIn])).stream().pipeThrough(ds).getReader()).then((arrayBufferOut) => {
				resolve(arrayBufferOut);
			}).catch((err) => {
				console.error("Could not decompress file!");
				console.error(err);
				resolve(null);
			});
		});
	}

	function tryDownloadURL(ipfsURL) {
		const theIpfsURL = ipfsURL;
		return new Promise((resolve) => {
			var percentDone = -1.0;
			const xhr = currentXHR = new XMLHttpRequest();
			cancelButton.disabled = false;
			cancelButton.style.display = "inline";
			xhr.open("GET", ipfsURL);
			xhr.responseType = "arraybuffer";
			xhr.addEventListener("progress", (evt) => {
				updateProgressBar("Update: " + Math.round(evt.loaded * 0.001) + " / " + Math.round(opts.dlSize * 0.001) + " kB", theIpfsURL, Math.min(evt.loaded / opts.dlSize, 1.0));
			});
			xhr.addEventListener("readystatechange", (evt) => {
				if(xhr.readyState === XMLHttpRequest.DONE) {
					updateProgressBar("Update: " + Math.round(opts.dlSize * 0.001) + " / " + Math.round(opts.dlSize * 0.001) + " kB", theIpfsURL, Math.min(evt.loaded / opts.dlSize, 1.0));
					if(cancelButton !== null) {
						cancelButton.disabled = true;
						currentXHR = null;
					}
					currentXHR = null;
					if(xhr.status === 200) {
						resolve(xhr.response);
					}else {
						console.error("Got response code " + xhr.status + " for: " + theIpfsURL);
						resolve(null);
					}
				}
			});
			xhr.addEventListener("error", (evt) => {
				if(cancelButton !== null) {
					cancelButton.disabled = true;
				}
				currentXHR = null;
				console.error("Could not complete request to: " + theIpfsURL);
				resolve(null);
			});
			xhr.addEventListener("load", (evt) => {
				if(cancelButton !== null) {
					cancelButton.disabled = true;
				}
				currentXHR = null;
			});
			xhr.addEventListener("abort", (evt) => {
				console.error("Request aborted: " + theIpfsURL);
				if(cancelButton !== null) {
					cancelButton.disabled = true;
				}
				currentXHR = null;
				resolve(null);
			});
			xhr.send();
		});
	}

	function delayProgress(delayMS) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, delayMS);
		});
	}

	async function tryDownloadClient(ipfsCID, ipfsPath) {
		var rand = Math.floor(Math.random() * IPFS_GATEWAYS.length);
		for(var i = 0; i < IPFS_GATEWAYS.length; ++i) {
			var url = IPFS_GATEWAYS[(rand + i) % IPFS_GATEWAYS.length](ipfsCID, ipfsPath);
			updateProgressBar("Update: 0 / " + Math.round(opts.dlSize * 0.001) + " kB", url, 0.0);
			try {
				var j = await tryDownloadURL(url);
				if(j) {
					if(opts.gzip) {
						try {
							updateProgressBar("Extracting...", url, -1);
							j = await tryDecompressDownload(j);
							if(j) {
								return j;
							}else {
								throw "Return value from tryDecompressDownload is undefined";
							}
						}catch(ex) {
							updateProgressBar("Client decompress failed!", url, -1);
							console.error("Caught exception during decompress: " + url);
							console.error(ex);
						}
					}else {
						return j;
					}
				}else {
					throw "Return value from tryDownloadURL is undefined";
				}
			}catch(ex) {
				updateProgressBar("Client download failed!", url, 1.0);
				console.error("Caught exception during download: " + url);
				console.error(ex);
			}
			await delayProgress(1000);
		}
		return null;
	}

	function loadClientFile(arrayBuffer) {
		if(progressPanel != null) {
			progressPanel.remove();
			progressPanel = null;
		}
		var objURL = URL.createObjectURL(new Blob([ arrayBuffer ], { type: "text/javascript;charset=utf-8" }));
		var scriptElement = document.createElement("script");
		scriptElement.type = "text/javascript";
		scriptElement.src = objURL;
		document.head.appendChild(scriptElement);
	}

    function initProgressScreen() {
        if (progressPanel) return;
    
        // Создаем корневой элемент с анимацией появления
        progressPanel = document.createElement("div");
        progressPanel.className = "eagler-progress-overlay";
        progressPanel.innerHTML = `
            <div class="eagler-progress-container">
                <div class="eagler-progress-content">
                    <img class="eagler-progress-icon" src="${LOADING_ICON_SRC}" alt="Loading" width="160" height="160">
                    <h2 class="eagler-progress-title">Идет загрузка, ждать не вредно <3</h2>
                    <h3 class="eagler-progress-status"></h3>
                    
                    <div class="eagler-progress-bar">
                        <div class="eagler-progress-bar-fill"></div>
                    </div>
                    
                    <h5 class="eagler-progress-details"></h5>
                    
                    <div class="eagler-progress-actions">
                        <button class="eagler-progress-cancel" disabled>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                            <span>Пропустить</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        `;
    
        // Получаем ссылки на элементы
        progressStr1 = progressPanel.querySelector(".eagler-progress-title");
        progressStr2 = progressPanel.querySelector(".eagler-progress-status");
        progressStr3 = progressPanel.querySelector(".eagler-progress-details");
        progressBarOuter = progressPanel.querySelector(".eagler-progress-bar");
        progressBarInner = progressPanel.querySelector(".eagler-progress-bar-fill");
        cancelButton = progressPanel.querySelector(".eagler-progress-cancel");
    
        // Обработчик для кнопки отмены
        cancelButton.addEventListener("click", () => currentXHR?.abort());
    
        // Добавляем стили через JavaScript
        const style = document.createElement("style");
        style.textContent = `
		:root {
            --eagler-primary: #6366f1;
            --eagler-primary-light: #818cf8;
            --eagler-primary-dark: #4f46e5;
            --eagler-bg: #ffffff;
            --eagler-text: #1e293b;
            --eagler-text-secondary: #64748b;
            --eagler-border: #e2e8f0;
            --eagler-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .eagler-progress-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            animation: eagler-fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            overflow: hidden;
        }
        
        .eagler-progress-container {
            width: 100%;
            max-width: 500px;
            padding: 0 24px;
            position: relative;
            z-index: 2;
        }
        
        .eagler-progress-content {
            background: var(--eagler-bg);
            border-radius: 20px;
            padding: 40px;
            box-shadow: var(--eagler-shadow);
            text-align: center;
            position: relative;
            overflow: hidden;
            transform: scale(0.95);
            animation: eagler-scale-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .eagler-progress-icon-container {
            position: relative;
            display: inline-block;
            margin-bottom: 24px;
        }
        
        .eagler-progress-icon {
            image-rendering: pixelated;
            width: 160px;
            height: 160px;
            object-fit: contain;
            filter: drop-shadow(0 6px 12px rgba(99, 102, 241, 0.2));
            transform: translateY(10px);
            opacity: 0;
            animation: eagler-icon-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
        }
        
        .eagler-progress-icon-shine {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
            transform: rotate(30deg) translate(-20px, -100px);
            animation: eagler-shine 3s ease-in-out infinite;
            pointer-events: none;
        }
        
        .eagler-progress-title {
            color: var(--eagler-text);
            font-size: 1.625rem;
            font-weight: 700;
            margin: 0 0 12px;
            line-height: 1.3;
            opacity: 0;
            transform: translateY(10px);
            animation: eagler-fade-up 0.5s ease-out 0.3s forwards;
        }
        
        .eagler-progress-status {
            color: var(--eagler-text-secondary);
            font-size: 1.125rem;
            font-weight: 500;
            margin: 0 0 28px;
            opacity: 0;
            transform: translateY(10px);
            animation: eagler-fade-up 0.5s ease-out 0.4s forwards;
        }
        
        .eagler-progress-bar-container {
            margin: 0 0 20px;
            position: relative;
        }
        
        .eagler-progress-bar {
            height: 10px;
            background: #f1f5f9;
            border-radius: 5px;
            overflow: hidden;
            position: relative;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .eagler-progress-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, var(--eagler-primary), var(--eagler-primary-light));
            border-radius: 5px;
            transition: width 0.4s cubic-bezier(0.65, 0, 0.35, 1);
            position: relative;
        }
        
        .eagler-progress-bar-glare {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 20px;
            background: linear-gradient(90deg, rgba(255,255,255,0.3), rgba(255,255,255,0));
            transform: skewX(-20deg);
        }
        
        .eagler-progress-percent {
            position: absolute;
            right: 0;
            top: -26px;
            font-size: 0.875rem;
            color: var(--eagler-primary-dark);
            font-weight: 600;
        }
        
        .eagler-progress-details {
            color: #94a3b8;
            font-size: 0.875rem;
            margin: 0 0 28px;
            word-break: break-word;
            min-height: 20px;
            opacity: 0;
            transform: translateY(5px);
            animation: eagler-fade-up 0.5s ease-out 0.5s forwards;
        }
        
        .eagler-progress-actions {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            opacity: 0;
            animation: eagler-fade-in 0.5s ease-out 0.6s forwards;
        }
        
        .eagler-progress-cancel {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #f8fafc;
            color: #64748b;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 20px;
            font-size: 0.9375rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.03);
        }
        
        .eagler-progress-cancel:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .eagler-progress-cancel:active {
            transform: translateY(0);
            box-shadow: 0 2px 3px rgba(0,0,0,0.05);
        }
        
        .eagler-progress-cancel:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .eagler-progress-cancel svg {
            width: 16px;
            height: 16px;
        }
        
        .eagler-progress-hint {
            color: #cbd5e1;
            font-size: 0.8125rem;
            margin: 0;
        }
        
        .eagler-heart-pulse {
            display: inline-block;
            animation: eagler-heartbeat 1.5s ease infinite;
        }
        
        .eagler-progress-particles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            overflow: hidden;
            pointer-events: none;
        }
        
        /* Анимации */
        @keyframes eagler-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes eagler-fade-up {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes eagler-scale-up {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes eagler-icon-enter {
            from { transform: translateY(20px) rotate(-5deg); opacity: 0; }
            to { transform: translateY(0) rotate(0); opacity: 1; }
        }
        
        @keyframes eagler-shine {
            0% { transform: rotate(30deg) translate(-100px, -100px); }
            50% { transform: rotate(30deg) translate(100px, 100px); }
            100% { transform: rotate(30deg) translate(-100px, -100px); }
        }
        
        @keyframes eagler-heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.2); }
            28% { transform: scale(1); }
            42% { transform: scale(1.2); }
            70% { transform: scale(1); }
        }
        
        /* Адаптив */
        @media (max-width: 480px) {
            .eagler-progress-content {
                padding: 32px 20px;
                border-radius: 16px;
            }
            
            .eagler-progress-icon {
                width: 120px;
                height: 120px;
            }
            
            .eagler-progress-title {
                font-size: 1.375rem;
            }
            
            .eagler-progress-status {
                font-size: 1rem;
            }
        }
        `;
    
        // Добавляем стили в документ
        document.head.appendChild(style);
    
        // Добавляем в DOM
        const container = document.getElementById(opts.container) || document.body;
        container.appendChild(progressPanel);
    }

	function updateProgressScreen(str1) {
		progressStr1.innerText = str1;
	}

	function updateProgressBar(str2, str3, prog) {
		progressStr2.innerText = str2;
		progressStr3.innerText = str3;
		if(prog < 0) {
			progressBarInner.style.width = "0%";
			progressBarOuter.style.border = "2px solid transparent";
		}else {
			progressBarInner.style.width = "" + Math.floor(Math.min(prog, 1.0) * 100.0) + "%";
			progressBarOuter.style.border = "2px solid black";
		}
	}
	
	function hasDownloadFailed(cidPath) {
		if(window.localStorage) {
			var keyPath = "_eagler_dl_" + cidPath + ".failedAt";
			var keyValue = window.localStorage.getItem(keyPath);
			if(keyValue) {
				try {
					if((Date.now() - parseInt(keyValue)) < 6 * 3600 * 1000) { // меньше 6 часов - не нада
						return true;
					}else {
						window.localStorage.removeItem(keyPath);
						return false;
					}
				}catch(ex) {
					window.localStorage.removeItem(keyPath);
					return false;
				}
			}else {
				return false;
			}
		}else {
			return false;
		}
	}
	
	function setDownloadFailed(cidPath) {
		if(window.localStorage) {
			window.localStorage.setItem("_eagler_dl_" + cidPath + ".failedAt", "" + Date.now());
		}
	}

	function loadClientFromIndexedDB(fileName) {
		const reqFileName = fileName;
		return new Promise((resolve) => {
			const openRequest = window.indexedDB.open("_eagler_loader_cache_v1", 1);
			openRequest.addEventListener("upgradeneeded", (evt) => {
				openRequest.result.createObjectStore("file_cache", { keyPath: "fileName" });
			});
			openRequest.addEventListener("success", (evt2) => {
				const db = openRequest.result;
				db.addEventListener("error", (err) => {
					console.error("Error loading from cache database!");
					console.error(err);
				});
				const transaction = db.transaction(["file_cache"], "readonly");
				const readRequest = transaction.objectStore("file_cache").get(reqFileName);
				var readResult = null;
				readRequest.addEventListener("success", (evt) => {
					resolve(readRequest.result);
				});
				transaction.addEventListener("success", (evt) => {
					db.close();
				});
				transaction.addEventListener("error", (evt) => {
					db.close();
					console.error("Failed to load from cache database!");
					resolve(null);
				});
			});
			openRequest.addEventListener("error", (evt) => {
				console.error("Failed to open cache database!");
				console.error(openRequest.error);
				resolve(null);
			});
		});
	}

	function saveClientToIndexedDB(fileData) {
		return new Promise((resolve) => {
			const openRequest = window.indexedDB.open("_eagler_loader_cache_v1", 1);
			openRequest.addEventListener("upgradeneeded", (evt) => {
				openRequest.result.createObjectStore("file_cache", { keyPath: "fileName" });
			});
			openRequest.addEventListener("success", (evt2) => {
				const db = openRequest.result;
				db.addEventListener("error", (err) => {
					console.error("Error saving to cache database!");
					console.error(err);
				});
				const transaction = db.transaction(["file_cache"], "readwrite");
				const writeRequest = transaction.objectStore("file_cache").put(fileData);
				writeRequest.addEventListener("success", (evt) => {
					resolve(true);
				});
				transaction.addEventListener("success", (evt) => {
					db.close();
				});
				transaction.addEventListener("error", (evt) => {
					db.close();
					console.error("Failed to save to cache database!");
					console.error(evt);
					resolve(false);
				});
			});
			openRequest.addEventListener("error", (evt) => {
				console.error("Failed to open cache database!");
				console.error(openRequest.error);
				resolve(false);
			});
		});
	}

	window.addEventListener("load", async function() {
		if(!window.__eaglercraftLoaderClient) {
			console.error("window.__eaglercraftLoaderClient is not defined!");
			return;
		}
		
		opts.container = window.__eaglercraftLoaderClient.container;
		opts.name = window.__eaglercraftLoaderClient.name;
		opts.file = window.__eaglercraftLoaderClient.file;
		opts.cid = window.__eaglercraftLoaderClient.cid;
		opts.path = window.__eaglercraftLoaderClient.path;
		opts.dlSize = window.__eaglercraftLoaderClient.dlSize;
		opts.gzip = window.__eaglercraftLoaderClient.gzip;
		
		initProgressScreen();
		updateProgressScreen("Загрузка EaglerCraft Recode ");
		updateProgressBar("Ждите...", "", -1);
		
		if(!window.indexedDB) {
			console.error("IndexedDB not supported, downloading client directly...");
			var dl = await tryDownloadClient(opts.cid, opts.path);
			if(dl) {
				updateProgressBar("ЗАГРУЗКА!", "Последний запуск: да токо шо.", -1);
				await delayProgress(500);
				loadClientFile(dl);
			}else {
				updateProgressScreen("Ошибка: скачать не можем.");
				updateProgressBar("давай потом попробуй", "ну че могу сказать все плохо.", -1);
			}
			return;
		}
		
		var clientCIDPath = (typeof opts.path !== "string" || opts.path.length === 0) ? opts.cid : (opts.cid + "/" + opts.path);
		
		var cachedClient = await loadClientFromIndexedDB(opts.file);
		var clientDisplayAge = 0;
		
		if(cachedClient) {
			clientDisplayAge = Math.floor((Date.now() - cachedClient.clientCachedAt) / 86400000.0);
			var hasFailed = hasDownloadFailed(clientCIDPath);
			if(hasFailed) {
				hasFailed = confirm("Не удалось запустить клиент!\n\nТы хочешь сделать бекап с  " + clientDisplayAge + " дней назад?");
			}
			if(hasFailed || cachedClient.clientVersionUID === clientCIDPath) {
				if(hasFailed) {
					console.error("все плохо");
				}
				console.log("нашли в кеше аууууууф");
				updateProgressBar("Запуск!", "Последний запуск: " + clientDisplayAge + " дней назад", -1);
				await delayProgress(1500);
				loadClientFile(cachedClient.clientPayload);
				return;
			}else {
				console.log("Хотя мы и нашли его, но чета он старый");
			}
		}else {
			console.log("Клиент не загружен, ждите");
		}
		
		var dl = await tryDownloadClient(opts.cid, opts.path);
		if(dl) {
			updateProgressBar("Выполняем кеширование!", "Последний запуск: токо что", -1);
			await saveClientToIndexedDB({
				fileName: opts.file,
				clientVersionUID: clientCIDPath,
				clientCachedAt: Date.now(),
				clientPayload: dl
			});
			updateProgressBar("Запуск!", "Последний запуск: токо что", -1);
			await delayProgress(500);
			loadClientFile(dl);
		}else {
			if(cachedClient) {
				setDownloadFailed(clientCIDPath);
				if(confirm("Не удалось запустить клиент!\n\nТы хочешь сделать бекап с  " + clientDisplayAge + " дней назад?")) {
					updateProgressBar("Запуск...", "Последний запуск: " + clientDisplayAge + " дней назад ?", -1);
					await delayProgress(1500);
					loadClientFile(cachedClient.clientPayload);
					return;
				}
			}
			updateProgressScreen("Ошибка: не можем скачать клиент!");
			updateProgressBar("Попробуйте позже", "Не удалось скачать клиент!", -1);
		}
	});

	function checkNotMobileBrowser() {
		try {
			document.exitPointerLock();
			return !(/Mobi/i.test(window.navigator.userAgent));
		}catch(e) {
			return false;
		}
	}

	if(!window.disableUserscripts) {
		var q = window.location.search;
		if(typeof q === "string" && q.startsWith("?")) {
			q = new URLSearchParams(q);
			var s = q.get("userscript");
			if(s) {
				if(["flameddogo99-eaglermobile.js", "irv77-eaglercraft-mobile.js"].includes(s)) {
					if(checkNotMobileBrowser()) {
						if(confirm("В этом браузере поддерживается блокировка указателя (че?).\n\nХотите это отключить?")) {
							q.delete("userscript");
							window.location.href = window.location.origin + window.location.pathname + (q.size > 0 ? ("?" + q.toString()) : "") + window.location.hash;
							return;
						}
					}
					alert("Внимание! Скрипты сторонняков — могут потушить игру.");
					var scriptElement = document.createElement("script");
					scriptElement.type = "text/javascript";
					scriptElement.src = "/js/userscript/" + s;
					document.head.appendChild(scriptElement);
				}
			}
		}
	}
})();