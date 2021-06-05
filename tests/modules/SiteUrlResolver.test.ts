import SiteUrlResolver from '../../src/modules/core/SiteUrlResolver';

describe('SiteUrlResolver', () => {
  it('With last slash', () => {
    const siteUrlResolver = new SiteUrlResolver({
      domain: 'example.com',
      path: '/',
      protocol: 'https',
    });

    expect(siteUrlResolver.resolve()).toBe('https://example.com');
  });

  it('Without last slash', () => {
    const siteUrlResolver = new SiteUrlResolver({
      domain: 'example.com',
      path: '/path',
      protocol: 'https',
    });

    expect(siteUrlResolver.resolve()).toBe('https://example.com/path');
  });
});
