import { DetectionRepository } from 'src/entities/domain/detection/Detection.repository';
import { DetectionService } from 'src/entities/domain/detection/Detection.service';

const allAnchors = document.querySelectorAll('a');
allAnchors.forEach((anchor) => {
  anchor.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('click');
    const currentAnchor = e.currentTarget as HTMLAnchorElement;

    const { href } = currentAnchor;
    console.log('pered');

    const detection = await DetectionService.getDetection(href);
    console.log(detection);

    if (!detection.isUrlSafety()) {
      await DetectionRepository.saveDetection(detection);
      await chrome.runtime.sendMessage({
        action: 'openNewTab',
        payload: {
          targetUrl: href,
          securityLevel: detection.securityLevel,
        },
      });
    } else {
      window.open(currentAnchor.href);
    }
  });
});
