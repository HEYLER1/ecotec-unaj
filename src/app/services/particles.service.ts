// particles.service.ts
import { Injectable } from '@angular/core';
import { tsParticles } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask';

@Injectable({
  providedIn: 'root'
})
export class ParticlesService {
  private particlesInitialized = false;

  constructor() {}

  async initializeParticlesEngine(): Promise<void> {
    if (this.particlesInitialized) return;
    
    try {
      console.log('Inicializando engine...');
      await loadFull(tsParticles);
      console.log('Cargando plugin de polígono...');
      await loadPolygonMaskPlugin(tsParticles);
      console.log('Engine y plugin inicializados');
      this.particlesInitialized = true;
    } catch (error) {
      console.error('Error inicializando particles engine:', error);
      throw error;
    }
  }

  async loadPolygonParticles(
    containerId: string, 
    svgUrl: string, 
    position: { x: number, y: number },
    scale: number = 1.2,
    useAbsolutePositioning: boolean = false
  ): Promise<void> {
    const options = {
      background: {
        color: { value: "transparent" },
      },
      fullScreen: { enable: !useAbsolutePositioning },
      fpsLimit: 60,
      particles: {
        color: {
          value: "#4285f4",
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none" as const,
          random: false,
          straight: false,
          outModes: {
            default: "bounce" as const,
          },
        },
        number: {
          value: this.getParticleCount(),
        },
        opacity: {
          value: 0.6,
        },
        size: {
          value: 1.5,
        },
        shape: {
          type: "circle",
        },
        links: {
          enable: true,
          color: "#4285f4",
          distance: 60,
          opacity: 0.7,
          width: 0.8,
        },
      },
      polygon: {
        draw: {
          enable: true,
          stroke: {
            color: { value: "#0e1bd6ff" },
            width: 0.5,
            opacity: 0.9
          },
        },
        enable: true,
        type: "inside" as const,
        move: {
          radius: 0,
          type: "path" as const
        },
        scale: scale,
        url: svgUrl,
        position: position,
      },
    };

    try {
      console.log(`Cargando partículas con polígono en ${containerId}...`);
      await tsParticles.load({
        id: containerId,
        options: options
      });
      console.log('Partículas con polígono cargadas');
    } catch (error) {
      console.error('Error al cargar partículas con polígono:', error);
      // Fallback sin polígono
      await this.loadSimpleParticles(containerId);
    }
  }

  async loadSimpleParticles(containerId: string): Promise<void> {
    const simpleOptions = {
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: { value: "#4285f4" },
        move: { enable: true, speed: 0.3 },
        number: { value: this.getParticleCount() },
        opacity: { value: 0.6 },
        size: { value: 1.5 },
        shape: { type: "circle" },
        links: {
          enable: true,
          color: "#4285f4",
          distance: 60,
          opacity: 0.7,
          width: 0.8,
        },
      },
    };

    try {
      console.log(`Cargando partículas simples en ${containerId}...`);
      await tsParticles.load({
        id: containerId,
        options: simpleOptions
      });
      console.log('Partículas simples cargadas');
    } catch (error) {
      console.error('Error al cargar partículas simples:', error);
    }
  }

  private getParticleCount(): number {
    const isSmallScreen = window.innerWidth <= 1024;
    return isSmallScreen ? 60 : 120;
  }

  private getResponsiveScale(): number {
    const isSmallScreen = window.innerWidth <= 1024;
    return isSmallScreen ? 0.6 : 1.2;
  }

  getResponsivePosition(desktopX: number, mobileX: number = 50, y: number = 50): { x: number, y: number } {
    const isSmallScreen = window.innerWidth <= 1024;
    return {
      x: isSmallScreen ? mobileX : desktopX,
      y: y
    };
  }

  destroyParticles(containerId?: string): void {
    try {
      if (containerId) {
        // Buscar contenedor específico por índice
        const containers = tsParticles.dom();
        for (let i = 0; i < containers.length; i++) {
          const container = containers[i];
          if (container && String(container.id) === containerId) {
            container.destroy();
            break;
          }
        }
      } else {
        // Destruir todos los contenedores
        const container = tsParticles.domItem(0);
        if (container) {
          container.destroy();
        }
      }
    } catch (error) {
      console.log('Error al limpiar partículas:', error);
    }
  }

  async refreshParticles(): Promise<void> {
    try {
      const container = tsParticles.domItem(0);
      if (container) {
        container.refresh();
      }
    } catch (error) {
      console.log('Error al refrescar partículas:', error);
    }
  }
}