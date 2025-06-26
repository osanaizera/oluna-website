'use client'

import { useCallback } from 'react'

/**
 * Custom hook for making announcements to screen readers
 * Provides methods to announce messages with different priority levels
 */
export const useAnnouncer = () => {
  const announce = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    const regionId = priority === 'assertive' 
      ? 'live-region-assertive' 
      : 'live-region-polite'
    
    const region = document.getElementById(regionId)
    
    if (region) {
      // Clear the region first to ensure the message is announced
      region.textContent = ''
      
      // Use setTimeout to ensure screen readers pick up the change
      setTimeout(() => {
        if (region) {
          region.textContent = message
        }
      }, 100)
    }
  }, [])

  const announcePolite = useCallback((message: string) => {
    announce(message, 'polite')
  }, [announce])

  const announceAssertive = useCallback((message: string) => {
    announce(message, 'assertive')
  }, [announce])

  const announceError = useCallback((message: string) => {
    announce(`Erro: ${message}`, 'assertive')
  }, [announce])

  const announceSuccess = useCallback((message: string) => {
    announce(`Sucesso: ${message}`, 'polite')
  }, [announce])

  const announceLoading = useCallback((message: string = 'Carregando...') => {
    announce(message, 'polite')
  }, [announce])

  const announcePageChange = useCallback((pageName: string) => {
    announce(`Navegou para ${pageName}`, 'polite')
  }, [announce])

  return {
    announce,
    announcePolite,
    announceAssertive,
    announceError,
    announceSuccess,
    announceLoading,
    announcePageChange
  }
}

export default useAnnouncer