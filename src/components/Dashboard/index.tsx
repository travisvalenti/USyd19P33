import React from 'react'

import './styles.css'

import Button from '../ui/Button'

const Dashboard: React.FC = () => {
  return (
    <div className="Dashboard">
      <div className="picture">
        <a href="https://google.com">
          <div className="icon">
            <img src='data:image/png;base64,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' alt="Google Search" width="131" />
          </div>
        </a>
        <span className="label">Search</span>
        <a href="/search?type=google"><Button className="createNew">Search</Button></a>
      </div>

      <div className="picture">
        <a href="https://drive.google.com/drive/my-drive">
          <div className="icon">
            <img src='data:image/png;base64,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' alt="Google Drive" width="100" />
          </div>
        </a>
        <span className="label">Drive</span>
        <a href="/search?type=drive"><Button className="createNew">Search</Button></a><br/>
      </div>

      <div className="picture">
        <a href="https://mail.google.com/mail">
          <div className="icon">
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAKsUlEQVR4nO2ce3BU1R3Hv+fce/feu7sBxqBsAgqJvJFnIxaKjA5UjFA7lFKUlxKwlJctYACh1mGGznRGyx+IYGlrtYQAIsPLYttx1LEMiATlTRABC0ECBkhCdvfu3fvoHyFh2bu72b13X0nv56/MefzO2d/vPH+/cwPY2NjY2NjY2NjY2NjY2NjY2NjY2NjYpBwSK/Pqvz8cj7Nn36XV1W7H5KmEfaBruvrVqlEu/hdyeZmuefJu6Q/2mO558sld0cpGNUB12cYj2L1jIAKBxoIOBxwTn4HjqbEAiWm3/190HfLef0DetgW6LDem8TzI+AlfdXp2ypBIVSJqsrps41d4f+sg6Lohj+n3EIRfzQPNzU1iz1s/2vXrkN56E+rJE8ZMQoBfPHPEM3nqYENWeMJ3u3dPoGXvvN808iPidEIsmQV2+AhrvW4jKPv3wf/2XwCfL3ohQQAzc9ZP732ieHdoMhtejp47+25M5QOAzwf/2jXgDleAL3kBxOUy1/NWju71IvD2nxE8sL/lwpIE9dTpTQByQpMNBiCVp13GhScywQP7oZyphDh7Lpj+A+Ks1TZQjx+D/0/roN+4EXcdUnnaHZ5mMABuXE+oI/qNG/D94ffgHh8Ffup0EEFIqH5rQ5dlyNu3Qf5gNyLtkTG5XmNIMhqA44CmHTzuXukIfvwR1DOVEOYuAFNQkFj9VoJ64QKkdW9Au1xlToDDYUiihkby8s0JB6BdroL/1RWQd+0ENM20nKxD0yDv2gn/qyvMKx+A6jHq1jADqo+eQOcuHug3b5pqRFcUBLaWQ/myAsKc+aAejyk52YJW8z0C69+EcvqUNUEdOuDq8ZOGZMMMUG7dwvWACuI27BcJoZ79Gt7lSxD89BNLcjJJ8NNP4F2y2LLyiduNG7KGYF2dIc9gAABoOH8eNVIQxJNnqWFIEqQN6+Ff/Rr0W/XWZKUR/VY9/Ktfg7RhPSBJlmQRjwfXpCAazp+PmB/RAADgrbqMSydPQ+ne07LrQak4BG/pYiiHKyzJSQfqsaPwLiuFUnHImiBCoHXviaoz5+Cvuhy9WHjCF488YjhbdejXF+3VIPRac/tCKOyIkRBKZmXdcVWXZchbyiH/68PEj5dhkHbtUC+4cPPYcUPe0IMH79K58RgagdqTp9CQk4O8/v1Azn9jqXPKvs/g+7oSwpz5YHr1tiQrWajnvoG0bi20K99ZlqUXFOLKqTMI1kVecsKJawaEct/DRRCuXUGL7oqWYBg4nhoHx8RJIGxc4yD5qCrkvR8g8N5WQFUsiSIch0CXrqg+8HnMcuEzIOoeEI1rhyrwfUAB6dEz0ap3o6qQ9+yCf+UrSRl5iaJduwrfqpUIbN5kWfm0sBA1Om1R+RHrmmnQX30V9bNmQx8/AWCsjV713Dn4Xl4C+cO9ltfeeFH+8xl8y0qhnqm0JohS0OKx8C9YCG+MjTYWprWnEYL6YT+C0K0AQvlG6FevmhUFXZYR2PgOlCNfQpw9F+See0zLitlOfR2kDW9B+fKwZVkktyPU52ZA6trNkhxTMwAAyO2jqZSXj/oFC0FGPmapI0Cjh7FhySIE9++zLCsc5YuD8JYuSory6cNDIZUug2xR+YCFGcBxHILBIHRdh+ZwoHbc03D16AFuy2bo3gbzPfL5IK1dA7XiEPiZv7Qea5AkSGV/R/Djj6zJAQDRCTwzGb5BhsCWaSzNAI7j7krz9uqDhkWloH36Wu5Y8PMD8L28xJIboNkdkgTl0+49oCxbDimJygcszADgjhGCwWBzmpKTg5vPz0S7ikOgO7dDD8lLFK3me/hXrYRjTDEcz04BCTN4VFQFgZ07IO/Ybt0ryzAgY38C3+OjAGp6vEbF8gGcUgqGYaCq6p1EQlD/8FDwhYUQyzdCv3TJfAO6Dvmfe6GcOA5x/ougLTyN0S5XQVr3BtQLF8y3eRuanw952gwo+eZd9C22kQwhDMOARhgdgdyOqJuzAGTUjy37k7SqS/D9bgXkPbsiH1dvB4V8v305OcofPgL+haUpVT6QhBkANC5FLMs2b8qh6CyL2jHFcPbqDUd5mSV/ki7LCGzeBOXY0buexui1tZA2rIdy5CtLvwMASE47aFOnw9e7j2VZ8ZA0H0DTfiBHCWf6uhUg8OtFaLdzO7SjRyy1pZ48Ad+yl8DPmAkACPztr9C9XksyAYAZOAjSpMlQ0/jKI6lOmEibciiqy4WbU6bDPWAQmPc2W/In6V4vpLVrTNcPhTgcwPifwztseNpf/SXdC0YpBcuyUJTo/pWG/gPA5XeGe+smaN9+m+wuJATtcj+C02cg2KlTZtpPhVCGYcAwTMwywdxc1M2ZD33c0yk53rUIIaCjn4B/UWnGlA+kYAY0wTBM4y05xjlcIxT1Ix+D2K0AQnkZtATfJJmFdOgAbepz8Fn16CaBlA29ppMRiWNN9T/QFXULF4P8cFiqutMMLRoKaekKBLJA+UAKZwBwxwiKohiOp+FovIDan02Eq+9DYLdsiv3Q1QyCADJxEnxFQ5Mr1yIpX3ybbsrx4u3dB77FS0B69kpeHwofhLJ0BfxZpnwgDQYA4tuUQwnmtENtyQvWAz4MA1o8FtKLv4GSohiDVdIWjGVZFpqmtbgUNUNpY8CnoLAx4FNdnVB7pOO90J4vge/+B0z0Nn2k9fzHcVxcm3IokicPdQsWNvqT4oQOH4HA0uUIZLnygTTOAKBld0U0dI5D7ZhiuLoVgNtaDr0hSsBHdAKTp8A3YFASepse0n4DajoZmcHbqzduLV4K2n+gIY/27YfgilcgtSLlA2meAU00XdLuiiHEiepy4ebU6XcCPpoOOu52wKQVfr2ZoRdRjZtySzflqNwO+IiFhWBZFtJ9mXMlWCVjBgAQNYYQD4IgQMvvjAS/5ck6MuAFu0OkwH48dURRNGW0bCSjBgASMwLHceB53tyylaVk3ABAfO4KQRCaN++2RFYYAGjcDyIF9kOXnLamfCCLDAA0LjGhRmBZts0tOeFklQEANF/SRFFsPqq2ZbLOAAzDoH379ok57loxGb0HhMOyLERRvPPy2uIXiq2BrJkBPM/D6XQ2K9/hcJj2GbUmMm4ASilcLhd4njfkOZ3OiCejtkRGfx3LsnC5XDHvAKGzoi2SEQMQQiAIQlzKpZRCyLJvipNJ2hdZSilEUUwoRsxxHFRVTTiQ0xpIqwHCTzmJIAgCNE2L+eSxNZK2JSjeJScWoii2uU05Le+C3G43HBH+W1SiNPmF2hIpNQDHcXC73UkdtQzDtCkjGDRDBcHy/b9ppKZKURzHJRzIyQZIBH0YDEBycy3d/xmGgcvlSrmCEj1JZQNMhGfwBgOwXbqY/pS8yZ2Qro3S7IkqU/BDhhg+CTL+10SPZ3aiyxAhBE6nEzzPp1UhlFI4nc60tWcF4nTCXVQ0LTzdYIAhy5efEh99dHW8b2wYhoHb7c6Y44xhmIh+pKyCELQvKTnbddSobeFZEdeKfqtWveQaPfqPVBRjzgSe5+FyuTK+DPA8n7WbMnE60WHevLM9p02L+EVITM2def313tLFixuUqqofaDU1oh4INJfvtmdPVrmLdV2H1+vNWPjy2qRJzX8TQQCTlwd+8OCAu6hoWqSRb2NjY2NjY2NjY2NjY2NjY2NjY2NjY5NG/gffM48XFixrmwAAAABJRU5ErkJggg==' alt="Google Docs" width="131" />
          </div>
        </a>
        <span className="label">Gmail</span>
        <a href="/search?type=gmail"><Button className="createNew">Search</Button></a><br/>
      </div>

      <div className="picture">
        <a href="https://docs.google.com">
          <div className="icon">
            <img src='data:image/png;base64,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' alt="Google Docs" width="131" />
          </div>
        </a>
        <span className="label">Docs</span>
        <a href="/search?type=docs"><Button className="createNew">Search</Button></a><br/>
        <a href="https://google.com"><Button className="createNew">Create New</Button></a>
      </div>

      <div className="picture">
        <a href="https://docs.google.com/spreadsheets/">
          <div className="icon">
            <img src='data:image/png;base64,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' alt="Google Docs" width="131" />
          </div>
        </a>
        <span className="label">Sheets</span>
        <a href="/search?type=sheets"><Button className="createNew">Search</Button></a><br/>
        <a href="https://google.com"><Button className="createNew">Create New</Button></a>
      </div>

      <div className="picture">
        <a href="https://docs.google.com/presentation">
          <div className="icon">
            <img src='data:image/png;base64,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' alt="Google Docs" width="131" />
          </div>
        </a>
        <span className="label">Slides</span>
        <a href="/search?type=slides"><Button className="createNew">Search</Button></a><br/>
        <a href="https://google.com"><Button className="createNew">Create New</Button></a>
      </div>

    </div>
  )

}

export default Dashboard
