# 🚀 ETF Pulse 환경 설정 가이드

## ✅ 완료된 작업

1. ✅ Python conda 환경 활성화 (`volumequant`)
2. ✅ Python 의존성 설치 완료
3. ✅ 백엔드 서버 실행 준비 완료

---

## 📦 Node.js 설치 (필수)

프론트엔드를 실행하려면 **Node.js**가 필요합니다.

### 방법 1: 공식 웹사이트에서 설치 (권장)

1. **https://nodejs.org/** 접속
2. **LTS 버전** (Long Term Support) 다운로드
3. 설치 파일 실행 후 기본 설정으로 설치
4. **PowerShell을 완전히 종료하고 다시 열기** (중요!)
5. 설치 확인:
   ```powershell
   node --version
   npm --version
   ```

### 방법 2: Chocolatey로 설치 (관리자 권한 필요)

```powershell
# Chocolatey가 설치되어 있다면
choco install nodejs-lts -y
```

### 방법 3: Conda로 설치 (시간이 좀 걸림)

```powershell
conda install -c conda-forge nodejs -y
```

---

## 🎯 실행 방법

### 가장 쉬운 방법 (한 번에 실행)

```powershell
cd C:\dev\etf-volume-portfolio
.\start-all.ps1
```

**이게 전부입니다!** 백엔드와 프론트엔드가 새 창에서 자동으로 실행됩니다.

**접속**:
- 프론트엔드: http://localhost:5173
- 백엔드 API: http://localhost:8002

---

### 개별 실행 (필요한 경우만)

백엔드만 실행:
```powershell
.\start-backend.ps1
```

프론트엔드만 실행:
```powershell
.\start-frontend.ps1
```

---

## 🔍 문제 해결

### Node.js가 인식되지 않을 때

1. **PowerShell 완전히 종료 후 재시작**
2. 환경 변수 확인:
   ```powershell
   $env:PATH
   ```
3. Node.js 설치 경로 확인:
   ```powershell
   where.exe node
   ```

### 백엔드 서버가 시작되지 않을 때

```powershell
# 오류 메시지 확인
cd app
python main.py
```

### 포트 충돌

- 백엔드: `http://localhost:8001`
- 프론트엔드: `http://localhost:5173`

다른 프로그램이 사용 중이면 포트를 변경하세요.

---

## 📝 체크리스트

- [ ] Node.js 설치 완료
- [ ] `node --version` 명령어 작동 확인
- [ ] `npm --version` 명령어 작동 확인
- [ ] conda 환경 `volumequant` 존재 확인
- [ ] 프론트엔드 의존성 설치 (`npm install` in frontend/)
- [ ] `.\start-all.ps1` 실행!

---

**모든 설정이 완료되면 `.\start-all.ps1`만 실행하면 됩니다!** 🎉

