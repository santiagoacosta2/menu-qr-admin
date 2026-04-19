# Guía de Contribución

## ⚠️ Reglas Críticas
**Dependencias**
- Este proyecto usa el configurador de ecosistemas [Gentleman AI](https://github.com/Gentleman-Programming/gentle-ai). **Es obligatorio usarlo para mantener consistencia en convenciones, código y documentación.**

**GIT:**
- NEVER ejecutar `git reset` (hard, soft, mixed) sin permiso explícito
- NEVER ejecutar `git rebase interactivo` sin permiso explícito
- Antes de cualquier operación destructiva, STOP y PREGUNTAR
- Iniciar GGA precommit hook para validar convenciones y de codigo


**Code Review — REJECT si:**
- Secrets/credentials hardcoded
- console.log en código de producción
- Error handling faltante



## Workflow

1. Crear branch desde main: `git checkout -b feature/nombre`
2. Trabajar en la feature
3. Commitear con conventional commits: `git commit -m "feat: description"`
4. Push: `git push -u origin feature/nombre`
5. Crear PR a main
6. Code review
7. Merge

## Commits

Usar Conventional Commits:

| Tipo | Uso |
|------|-----|
| `feat:` | nueva funcionalidad |
| `fix:` | bug fix |
| `docs:` | documentación |
| `style:` | formatting (sin cambio de código) |
| `refactor:` | refactor |
| `test:` | tests |
| `chore:` | mantenimiento |

# Pre-commit hook para validar convenciones:
Inicair GGA para validar convenciones y código antes de cada commit:
No funciona con powershell o cmd. Usar WSL o Git Bash.

**Recomienndo usar Git Bash desde la terminnal de VSCode para evitar problemas con el hook.**
```bash
gga install             # Install git hook
# Edit .gga to set your PROVIDER
# Create AGENTS.md with your coding standards
# Done — every commit gets reviewed 🎉
```
Para mas informacion sobre GGA: ver [GGA Documentation](https://github.com/Gentleman-Programming/gentleman-guardian-angel)

## SDD (Spec-Driven Development)

Para features significativas, usar el workflow SDD:

```
/sdd-init                          # Inicializar contexto
/sdd-propose <change>              # Crear proposal
/sdd-spec <change>                 # Escribir specs
/sdd-design <change>               # Diseño técnico
/sdd-tasks <change>                # Task breakdown
/sdd-apply <change>                # Implementar
/sdd-verify <change>               # Verificar
/sdd-archive <change>              # Archivar
```

## Stack

| Tecnología | Versión |
|------------|---------|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| TypeScript | 5 |
| Tailwind CSS | 4 |
| Prisma | 7.7.0 |
| better-auth | 1.6.5 |
| shadcn | 4.3.0 |

## Código

- Function components únicamente
- Server Components por defecto; Client Components con "use client"
- TypeScript strict mode
- No console.log en producción
- Siempre error handling
- Mensajes de error en español

## UI Components

Usar shadcn/ui para componentes base. No crear custom para:
Button, Input, Select, Dialog, Dropdown, Card

Agregar: `npx shadcn@latest add <componente>`

## DB

```bash
npm run db:migrate    # Run migrations
npm run db:seed       # Seed data
npm run db:studio     # Prisma Studio
npx prisma generate   # Generate client
```

## Memorias (Engram)

Este proyecto usa Engram para memoria persistente:

Guardar insights importantes para evitar repetir discusiones y mantener un historial de decisiones técnicas.
subirlas al repositorio para que todos puedan acceder a ellas.
```bash
engram sync --import  # importar nuevos fragmentos
engram sync # Exportar nuevas memorias como fragmento comprimido
```
**Primero ejecutar `engram sync --import` para traer nuevas memorias al proyecto, luego `engram sync` para exportar cualquier nueva memoria creada durante el desarrollo.**

Para más información sobre Engram: ver [Engram Documentation](https://github.com/Gentleman-Programming/engram#quick-start)

## Pull Requests

- Título descriptivo siguiendo conventional commits
- Descripción del qué y por qué
- Link a issue si aplica
- Screenshots para cambios de UI